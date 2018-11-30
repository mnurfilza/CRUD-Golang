package test

import (
	"Latihan_crud/handler"
	"Latihan_crud/model"
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
)

func TestMatakulHandler(t *testing.T) {
	db, err := initDatabase()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	var dataInsertMatkul = []model.Matakuliah{
		model.Matakuliah{Kd_mk: "1si2", Mata_kuliah: "Sistem Informasi"},
		model.Matakuliah{Kd_mk: "1ea2", Mata_kuliah: "Sistem Data"},
		model.Matakuliah{Kd_mk: "1pa2", Mata_kuliah: "Sistem Terdistribusi"},
		model.Matakuliah{Kd_mk: "1st2", Mata_kuliah: "Algortima Pemrograman"},
	}
	webHandler := http.HandlerFunc(handler.SS)
	handler.RegisDB(db)

	t.Run("testing post", func(t *testing.T) {
		for _, item := range dataInsertMatkul {
			res := httptest.NewRecorder()
			jsonmarshal, err := json.MarshalIndent(item, "", " ")
			if err != nil {
				t.Fatal(err)
			}
			req, err := http.NewRequest(http.MethodPost, "/api/ss/matakuliah", bytes.NewBuffer(jsonmarshal))
			if err != nil {
				t.Fatal(err)
			}
			webHandler.ServeHTTP(res, req)
			buff, err := ioutil.ReadAll(res.Body)
			if err != nil {
				t.Fatal(err)
			}
			got := model.Matakuliah{}
			if err := json.Unmarshal(buff, &got); err != nil {
				t.Fatal(err)
			}
			compareMatakuliah(t, got, item)
		}
	})
	t.Run("testing gets", func(t *testing.T) {
		res := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodGet, "/api/ss/matakuliah", nil)
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := []model.Matakuliah{}
		if err := json.Unmarshal(buff, &got); err != nil {
			t.Fatal(err)
		}
		for index, item := range got {
			compareMatakuliah(t, item, dataInsertMatkul[index])
		}
	})
	t.Run("test gets with params", func(t *testing.T) {
		res := httptest.NewRecorder()
		params := fmt.Sprintf("npm,=,%s;kelas,=,%s", dataInsertMatkul[0].Kd_mk, dataInsertMatkul[0].Mata_kuliah)
		req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("/api/ss/matakuliah?params=%s", url.QueryEscape(params)), nil)
		if err != nil {

			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := []model.Matakuliah{}
		if err := json.Unmarshal(buff, &got); err != nil {

			t.Fatal(err)
		}
		// compareMahasiswa(t, got[0], dataInsertMahasiswa[0])
	})
	t.Run("testing gets 1 data", func(t *testing.T) {
		res := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("/api/ss/matakuliah/%s", dataInsertMatkul[0].Kd_mk), nil)
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := model.Matakuliah{}
		if err := json.Unmarshal(buff, &got); err != nil {
			t.Fatal(err)
		}
		compareMatakuliah(t, got, dataInsertMatkul[0])

	})

	t.Run("testing Put", func(t *testing.T) {
		res := httptest.NewRecorder()
		dataUpdate := map[string]interface{}{
			"kd_mk": dataInsertMatkul[0].Kd_mk, "mata_kuliah": "Sistem Informasi",
		}
		jsonUpdate, err := json.MarshalIndent(dataUpdate, "", " ")
		if err != nil {
			t.Fatal(err)
		}

		req, err := http.NewRequest(http.MethodPut, fmt.Sprintf("/api/ss/matakuliah/%s", dataInsertMatkul[0].Kd_mk), bytes.NewBuffer(jsonUpdate))
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := model.Matakuliah{}
		if err := json.Unmarshal(buff, &got); err != nil {
			t.Fatal(err)
		}
		// compareMahasiswa(t, got, dataInsertMahasiswa)
	})

	t.Run("test Delete", func(t *testing.T) {
		res := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodDelete, fmt.Sprintf("/api/ss/matakuliah/%s", dataInsertMatkul[0].Kd_mk), nil)
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		if fmt.Sprintf("%v", res.Body) != "true" {
			t.Fatal("Kode mata kuliah tidak terhapus")
		}
	})

}
