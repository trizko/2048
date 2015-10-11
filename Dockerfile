FROM golang:1.5.1

ADD . /go/src/github.com/trizko/2048
RUN go install github.com/trizko/2048
WORKDIR /go/src/github.com/trizko/2048

ENTRYPOINT /go/bin/2048

EXPOSE 8080
