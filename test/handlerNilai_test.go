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

var dataInsertNilai = []model.Nilai{
	model.Nilai{
		Kd_mk: "pa4",
		NPM:   "12345678",
		UAS:   75,
		UTS:   75,
	},
	model.Nilai{
		Kd_mk: "la2",
		NPM:   "11111111",
		UAS:   75,
		UTS:   75,
	},
	model.Nilai{
		Kd_mk: "sa2",
		NPM:   "33333333",
		UAS:   75,
		UTS:   75,
	},
	model.Nilai{
		Kd_mk: "ea2",
		NPM:   "44444444",
		UAS:   75,
		UTS:   75,
	},
	model.Nilai{
		Kd_mk: "ba2",
		NPM:   "55555555",
		UAS:   75,
		UTS:   75,
	},
}

func TestNilaiHandler(t *testing.T) {
	db, err := initDatabase()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	webHandler := http.HandlerFunc(handler.SS)
	handler.RegisDB(db)

	t.Run("testing post", func(t *testing.T) {
		for index, item := range dataInsertNilai {
			res := httptest.NewRecorder()
			jsonmarshal, err := json.MarshalIndent(item, "", " ")
			if err != nil {
				t.Fatal(err)
			}
			req, err := http.NewRequest(http.MethodPost, "/api/ss/nilai", bytes.NewBuffer(jsonmarshal))
			if err != nil {
				t.Fatal(err)
			}
			webHandler.ServeHTTP(res, req)
			buff, err := ioutil.ReadAll(res.Body)
			if err != nil {
				t.Fatal(err)
			}

			got := model.Nilai{IdNilai: index + 1}
			want := model.Nilai{IdNilai: index + 1,
				NPM:   item.NPM,
				Kd_mk: item.Kd_mk,
				UAS:   item.UAS,
				UTS:   item.UTS,
			}

			if err := json.Unmarshal(buff, &got); err != nil {
				t.Fatal(err)
			}
			compareNilai(t, got, want)
		}
	})

	t.Run("testing gets", func(t *testing.T) {
		res := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodGet, "/api/ss/nilai", nil)
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := []model.Nilai{}
		if err := json.Unmarshal(buff, &got); err != nil {
			t.Fatal(err)
		}
		for index, item := range got {
			compareNilai(t, item, dataInsertNilai[index])
		}
	})

	t.Run("test gets with params", func(t *testing.T) {
		res := httptest.NewRecorder()
		params := fmt.Sprintf("idnilai,=,%v;kd_mk,=,%s", dataInsertNilai[0].IdNilai, dataInsertNilai[0].Kd_mk)
		req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("/api/ss/nilai?params=%s", url.QueryEscape(params)), nil)
		if err != nil {

			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := []model.Nilai{}
		if err := json.Unmarshal(buff, &got); err != nil {

			t.Fatal(err)
		}
		// compareNilai(t, got[0], dataInsertNilai[0])
	})

	t.Run("testing gets 1 data", func(t *testing.T) {
		res := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("/api/ss/nilai/1"), nil)
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}

		got := model.Nilai{}
		if err := json.Unmarshal(buff, &got); err != nil {
			t.Fatal(err)
		}
		compareNilai(t, got, dataInsertNilai[0])

	})

	t.Run("testing Put", func(t *testing.T) {
		res := httptest.NewRecorder()
		dataUpdate := map[string]interface{}{
			// "npm":   "17114444",
			// "kd_mk": "ae12",
			"uts": 68.0,
			"uas": 75.0,
		}
		jsonUpdate, err := json.MarshalIndent(dataUpdate, "", " ")
		if err != nil {
			t.Fatal(err)
		}

		req, err := http.NewRequest(http.MethodPut, fmt.Sprintf("/api/ss/nilai/%s", "1"), bytes.NewBuffer(jsonUpdate))
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		buff, err := ioutil.ReadAll(res.Body)
		if err != nil {
			t.Fatal(err)
		}
		got := model.Nilai{}
		if err := json.Unmarshal(buff, &got); err != nil {
			t.Fatal(err)
		}
		// compareNilai(t, got, dataInsertNilai[0])
	})

	t.Run("test Delete", func(t *testing.T) {
		res := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodDelete, fmt.Sprintf("/api/ss/nilai/%v", dataInsertNilai[0].IdNilai), nil)
		if err != nil {
			t.Fatal(err)
		}
		webHandler.ServeHTTP(res, req)
		if fmt.Sprintf("%v", res.Body) != "true" {
			t.Fatal("Id Nilai tidak terhapus")
		}
	})
}
