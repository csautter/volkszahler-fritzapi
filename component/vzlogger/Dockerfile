FROM debian:buster-20231009-slim

EXPOSE 80

RUN apt-get -y update
RUN apt-get install -y git
RUN apt-get install -y cmake
RUN apt-get install -y autoconf
RUN apt-get install -y libtool
RUN apt-get install -y uuid-dev
RUN apt-get install -y libcurl4-openssl-dev
RUN apt-get install -y libssl-dev
RUN apt-get install -y libgnutls28-dev
RUN apt-get install -y libgcrypt20-dev
RUN apt-get install -y libmicrohttpd-dev
RUN apt-get install -y libsasl2-dev
RUN apt-get install -y libunistring-dev
RUN apt-get install -y wget
RUN apt-get install -y sudo
RUN apt-get install -y pkg-config
RUN apt-get install -y build-essential
RUN apt-get install -y vim
RUN apt-get install -y nodejs

WORKDIR /app
COPY install.sh .
RUN bash install.sh

CMD ["/usr/local/bin/vzlogger","-c","/etc/vzlogger.conf"]