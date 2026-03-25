FROM alpine:3.19

WORKDIR /tmp

COPY entrypoint.sh .

RUN ["chmod", "+x", "/tmp/entrypoint.sh"]

ENTRYPOINT ["/tmp/entrypoint.sh"]
