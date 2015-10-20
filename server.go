package main

import (
    "net/http"
    "log"
    "os"
    "bufio"
    "path/filepath"
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
        http.Error(w, "404 - Not Found", http.StatusNotFound)
        return
    }
    defer file.Close()

    bw := bufio.NewReader(file);
    bw.WriteTo(w)
}

func staticHandler(w http.ResponseWriter, r *http.Request) {
    path := "public/" + r.URL.Path

    file, err := os.Open(path)
    if err != nil {
        http.Error(w, "404 - Not Found", http.StatusNotFound)
        return
    }
    defer file.Close();

    bw := bufio.NewReader(file)
    w.Header().Set("Content-Type", getContentType(path))
    bw.WriteTo(w)
}

func getContentType(path string) string {
	var contentType string

	switch filepath.Ext(path) {
	case ".css":
		contentType = "text/css"
	case ".png":
		contentType = "image/png"
	case ".js":
		contentType = "application/js"
	default:
		contentType = "text/plain"
	}

	return contentType
}
