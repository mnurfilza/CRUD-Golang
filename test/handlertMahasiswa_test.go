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

func TestMahasiswaHandler(t *testing.T) {
	db, err := initDatabase()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	var dataInsertMahasiswa = []model.Mahasiswa{
		model.Mahasiswa{
			NPM:   "1234567890",
			Nama:  "AIRTAS",
			Kelas: "5KA34",
		},
		model.Mahasiswa{NPM: "1233255422", Nama: "SARITAS", Kelas: "5KA14"},
		model.Mahasiswa{
			NPM:   "1232341233",
			Nama:  "UNIRAS",
			Kelas: "5KA24",
		},
		model.Mahasiswa{
			NPM:   "1232455644",
			Nama:  "DIA",
			Kelas: "5KA12",
		},
		model.Mahasiswa{
			NPM:   "1223131454",
			Nama:  "NOVI",
			Kelas: "5KA12",
		},
	}

	webHandler := http.HandlerFunc(handler.SS)
	handler.RegisDB(db)

	t.Run("Testing Post", func(t *testing.T) {
		for _, item := range dataInsertMahasiswa {
			res := httptest.NewRecorder()
			jsonMarshal, err := json.MarshalIndent(item, "", " ")
			if err != nil {
				t.Fatal(err)
			}
			req, err := http.NewRequest(http.MethodPost, "/api/ss/mahasiswa/", bytes.NewBuffer(jsonMarshal))
			if err != nil {
				t.Fatal(err)
			}
			webHandler.ServeHTTP(res, req)
			buff, err := ioutil.ReadAll(res.Body)
			if err != nil {
				t.Fatal(err)
			}
			got := model.Mahasiswa{}
			if err := json.Unmarshal(buff, &got); err != nil {
				t.Fatal(err)
			}
			compareMahasiswa(t, got, item)
		}
	})

	t.Run("testing gets", func(t *testing.T) {
		res := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodGet, "/api/ss/mahasiswa", nil)
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := []model.Mahasiswa{}
		if err := json.Unmarshal(buff, &got); err != nil {
			t.Fatal(err)
		}
		for index, item := range got {
			compareMahasiswa(t, item, dataInsertMahasiswa[index])
		}
	})

	t.Run("test gets with params", func(t *testing.T) {
		res := httptest.NewRecorder()
		params := fmt.Sprintf("npm,=,%s;kelas,=,%s", dataInsertMahasiswa[0].NPM, dataInsertMahasiswa[0].Kelas)
		req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("/api/ss/mahasiswa?params=%s", url.QueryEscape(params)), nil)
		if err != nil {

			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := []model.Mahasiswa{}
		if err := json.Unmarshal(buff, &got); err != nil {

			t.Fatal(err)
		}
		// compareMahasiswa(t, got[0], dataInsertMahasiswa[0])
	})

	t.Run("testing gets 1 data", func(t *testing.T) {
		res := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("/api/ss/mahasiswa/%s", dataInsertMahasiswa[0].NPM), nil)
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := model.Mahasiswa{}
		if err := json.Unmarshal(buff, &got); err != nil {
			t.Fatal(err)
		}
		compareMahasiswa(t, got, dataInsertMahasiswa[0])

	})

	t.Run("testing Put", func(t *testing.T) {
		res := httptest.NewRecorder()
		dataUpdate := map[string]interface{}{
			"npm": dataInsertMahasiswa[0].NPM, "kelas": "2ka35",
		}
		jsonUpdate, err := json.MarshalIndent(dataUpdate, "", " ")
		if err != nil {
			t.Fatal(err)
		}

		req, err := http.NewRequest(http.MethodPut, fmt.Sprintf("/api/ss/mahasiswa/%s", dataInsertMahasiswa[0].NPM), bytes.NewBuffer(jsonUpdate))
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := model.Mahasiswa{}
		if err := json.Unmarshal(buff, &got); err != nil {
			t.Fatal(err)
		}
		// compareMahasiswa(t, got, dataInsertMahasiswa)
	})

	t.Run("test Delete", func(t *testing.T) {
		res := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodDelete, fmt.Sprintf("/api/ss/mahasiswa/%s", dataInsertMahasiswa[0].NPM), nil)
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		if fmt.Sprintf("%v", res.Body) != "true" {
			t.Fatal("NPM tidak terhapus")
		}
	})

}
