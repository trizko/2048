package main

import (
    "net/http"
    "log"
    "os"
    "bufio"
    "strings"
)

func main() {

    http.HandleFunc("/", indexHandler)
    http.HandleFunc("/css/", staticHandler)
    http.HandleFunc("/img/", staticHandler)
    http.HandleFunc("/js/", staticHandler)

    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal("something went wrong...")
    }
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
    file, err := os.Open("public/index.html")
    if err != nil {
        w.WriteHeader(404)
        w.Write([]byte("404 - " + http.StatusText(http.StatusNotFound)))
    } else {
        bw := bufio.NewReader(file);

        bw.WriteTo(w)
    }
}

func staticHandler(w http.ResponseWriter, r *http.Request) {
    path := "public/" + r.URL.Path
    file, err := os.Open(path)
    if err != nil {
        w.WriteHeader(404)
        w.Write([]byte("404 - " + http.StatusText(http.StatusNotFound)))
    } else {
        var contentType string
        bw := bufio.NewReader(file)

        if strings.HasSuffix(path, ".css") {
            contentType = "text/css"
        } else if strings.HasSuffix(path, ".png") {
            contentType = "image/png"
        } else if strings.HasSuffix(path, ".js") {
            contentType = "application/js"
        } else {
            contentType = "text/plain"
        }

        w.Header().Set("Content-Type", contentType)
        bw.WriteTo(w)
    }
}
