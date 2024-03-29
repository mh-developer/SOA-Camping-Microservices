from functools import wraps
import json
import os
from six.moves.urllib.request import urlopen

from flask import request, _request_ctx_stack
from jose import jwt

from resources.errors import UnauthorizedError

AUTH0_DOMAIN = os.environ['AUTH0_DOMAIN']
API_AUDIENCE = os.environ['AUTH0_API_URL']
ALGORITHMS = ["RS256"]


def get_token_auth_header():
    """Obtains the access token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        # raise AuthError({"code": "authorization_header_missing",
        #                  "description":
        #                      "Authorization header is expected"}, 401)
        raise UnauthorizedError

    parts = auth.split()

    if parts[0].lower() != "bearer":
        # raise AuthError({"code": "invalid_header",
        #                  "description":
        #                      "Authorization header must start with"
        #                      " Bearer"}, 401)
        raise UnauthorizedError
    elif len(parts) == 1:
        # raise AuthError({"code": "invalid_header",
        #                  "description": "Token not found"}, 401)
        raise UnauthorizedError
    elif len(parts) > 2:
        # raise AuthError({"code": "invalid_header",
        #                  "description":
        #                      "Authorization header must be"
        #                      " Bearer token"}, 401)
        raise UnauthorizedError

    token = parts[1]
    return token


def requires_scope(required_scope):
    """Determines if the required scope is present in the access token
    Args:
        required_scope (str): The scope required to access the resource
    """
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    if unverified_claims.get("scope"):
        token_scopes = unverified_claims["scope"].split()
        for token_scope in token_scopes:
            if token_scope == required_scope:
                return True
    return False


def requires_auth(f):
    """Determines if the access token is valid
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen("https://" + AUTH0_DOMAIN + "/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        try:
            unverified_header = jwt.get_unverified_header(token)
        except jwt.JWTError:
            # raise AuthError({"code": "invalid_header",
            #                  "description":
            #                      "Invalid header. "
            #                      "Use an RS256 signed JWT Access Token"}, 401)
            raise UnauthorizedError
        if unverified_header["alg"] == "HS256":
            # raise AuthError({"code": "invalid_header",
            #                  "description":
            #                      "Invalid header. "
            #                      "Use an RS256 signed JWT Access Token"}, 401)
            raise UnauthorizedError
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token=token,
                    key=rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://" + AUTH0_DOMAIN + "/"
                )
            except jwt.ExpiredSignatureError:
                # raise AuthError({"code": "token_expired",
                #                  "description": "token is expired"}, 401)
                raise UnauthorizedError
            except jwt.JWTClaimsError:
                # raise AuthError({"code": "invalid_claims",
                #                  "description":
                #                      "incorrect claims,"
                #                      " please check the audience and issuer"}, 401)
                raise UnauthorizedError
            except Exception:
                # raise AuthError({"code": "invalid_header",
                #                  "description":
                #                      "Unable to parse authentication"
                #                      " token."}, 401)
                raise UnauthorizedError

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        # raise AuthError({"code": "invalid_header",
        #                  "description": "Unable to find appropriate key"}, 401)
        raise UnauthorizedError

    return decorated
