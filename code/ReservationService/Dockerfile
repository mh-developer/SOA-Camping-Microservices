FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

WORKDIR /app
EXPOSE 80 443

RUN python -m pip install --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

ENV PYTHONPATH=/app

COPY . /app