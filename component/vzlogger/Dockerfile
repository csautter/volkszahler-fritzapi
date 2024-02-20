# Reference: https://github.com/volkszaehler/vzlogger/blob/master/Dockerfile
FROM debian:bookworm-20240211-slim AS build

# Install dependencies
RUN apt-get -y update \
    && apt-get install --no-install-recommends -y git \
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
    libjson-c-dev \
    libjson-c5 \
    libltdl-dev \
    wget \
    sudo \
    pkg-config \
    build-essential \
    ca-certificates \
    automake \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives /var/lib/apt/lists

WORKDIR /app
COPY component/vzlogger/install.sh .
RUN bash install.sh

# Test the installation
RUN vzlogger --version

FROM debian:bookworm-20240211-slim

RUN apt-get -y update \
    && apt-get install --no-install-recommends -y \
    libcurl4-openssl-dev \
    libmicrohttpd-dev \
    nodejs \
    npm \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives /var/lib/apt/lists

# libsml is linked statically => no need to copy
COPY --from=build /usr/local/bin/vzlogger /usr/local/bin/vzlogger
COPY --from=build /usr/local/lib/libmbus.so* /usr/local/lib/
COPY --from=build /usr/local/lib/libjson-c.so* /usr/local/lib/

# without running a user context, no exec is possible and without the dialout group no access to usb ir reader possible
RUN useradd -m -s /bin/bash -G dialout vz

# Test the installation
RUN vzlogger --version

# Copy fritzapi and install npm
COPY api /app/api
WORKDIR /app/api
RUN npm ci && npm cache clean --force

USER vz
CMD ["/usr/local/bin/vzlogger","-c","/etc/vzlogger.conf", "--foreground"]