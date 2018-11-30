package handler

import (
	"database/sql"
	"fmt"
	"net/http"
	"strings"
)

var db *sql.DB

func RegisDB(sqlDB *sql.DB) {
	if db != nil {
		panic("db telah terdaftar")
	}
	db = sqlDB
}

func LastIndex(r *http.Request) string {
	dataURL := strings.Split(fmt.Sprintf("%s", r.URL.Path), "/")
	lastIndex := dataURL[len(dataURL)-1]
	return lastIndex
}

func SS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "text/htmll; charset=utf-8; application/json")
	dataURL := strings.Split(fmt.Sprintf("%s", r.URL.Path), "/")
	switch dataURL[3] {
	case "mahasiswa":
		switch r.Method {
		case http.MethodGet:
			HandlerMahasiswaGet(w, r)
		case http.MethodPost:
			HandlerMahasiswaPost(w, r)
		case http.MethodPut:
			HandlerMahasiswaPut(w, r)
		case http.MethodDelete:
			HandlerMahasiswaDelete(w, r)
		default:
			w.Write([]byte("method tidak ditemukan"))
		}
	case "nilai":
		switch r.Method {
		case http.MethodGet:
			HandlerNilaiGet(w, r)
		case http.MethodPost:
			HandlerNilaiPost(w, r)
		case http.MethodPut:
			HandlerNilaiPut(w, r)
		case http.MethodDelete:
			HandlerNilaiDelete(w, r)
		default:
			w.Write([]byte("method tidak ditemukan"))

		}
	case "matakuliah":
		switch r.Method {
		case http.MethodGet:
			HandlerMatakuliahGet(w, r)
		case http.MethodPost:
			HandlerMatakuliahPost(w, r)
		case http.MethodPut:
			HandlerMatakuliahPut(w, r)
		case http.MethodDelete:
			HandlerMatakuliahDelete(w, r)
		default:
			w.Write([]byte("method tidak ditemukan"))

		}
	default:
		w.Write([]byte("request not found"))

	}
}
