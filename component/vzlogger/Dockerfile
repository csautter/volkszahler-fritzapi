FROM debian:buster-20240130-slim

EXPOSE 80

RUN apt-get -y update \
    && apt-get install -y git \
    cmake \
    autoconf \
    libtool \
    uuid-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    libgnutls28-dev \
    libgcrypt20-dev \
    libmicrohttpd-dev \
    libsasl2-dev \
    libunistring-dev \
    wget \
    sudo \
    pkg-config \
    build-essential \
    vim \
    nodejs \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives /var/lib/apt/lists

WORKDIR /app
COPY install.sh .
RUN bash install.sh

CMD ["/usr/local/bin/vzlogger","-c","/etc/vzlogger.conf"]