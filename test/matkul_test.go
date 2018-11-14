package test

import (
	"Latihan_crud/model"
	"fmt"
	"testing"
)

func TestMatkul(t *testing.T) {
	var dataInsertMatkul = []model.Matakuliah{
		model.Matakuliah{Kd_mk: "1si2", Mata_kuliah: "Sistem Informasi"},
		model.Matakuliah{Kd_mk: "1ea2", Mata_kuliah: "Sistem Data"},
		model.Matakuliah{Kd_mk: "1pa2", Mata_kuliah: "Sistem Terdistribusi"},
		model.Matakuliah{Kd_mk: "1st2", Mata_kuliah: "Algortima Pemrograman"},
	}

	db, err := initDatabase()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	t.Run("testing Insert Get Matakuliah", func(t *testing.T) {
		for _, dataInsert := range dataInsertMatkul {
			err := dataInsert.Insert(db)
			if err != nil {
				t.Fatal(err)
			}
			got := model.Matakuliah{Kd_mk: dataInsert.Kd_mk}
			if err := got.Get(db); err != nil {
				t.Fatal(err)
			}
			compareMatakuliah(t, got, dataInsert)
		}
	})

	t.Run("testing Update Get", func(t *testing.T) {
		update := map[string]interface{}{
			"mata_kuliah": "Sistem Informasi",
		}
		dataUpdate := dataInsertMatkul[0]
		if err := dataUpdate.Update(db, update); err != nil {
			t.Fatal(err)
		}
		got := model.Matakuliah{Kd_mk: dataUpdate.Kd_mk}
		if err := got.Get(db); err != nil {
			t.Fatal(err)
		}
		compareMatakuliah(t, got, dataUpdate)
	})

	t.Run("testing Gets", func(t *testing.T) {
		result, err := model.GetAllMatakuliah(db)
		if err != nil {
			t.Fatal(err)
		}
		for _, item := range result {
			got := model.Matakuliah{Kd_mk: item.Kd_mk}
			if err := got.Get(db); err != nil {
				t.Fatal(err)
			}
			compareMatakuliah(t, got, *item)
		}
	})

	t.Run("testing gets with Paramaters", func(t *testing.T) {
		params := "mata_kuliah,=,Sistem Data"
		result, err := model.GetAllMatakuliah(db, params)
		if err != nil {
			t.Fatal(err)
		}
		for _, item := range result {
			got := model.Matakuliah{Kd_mk: item.Kd_mk}
			if err := got.Get(db); err != nil {
				t.Fatal(err)
			}
			compareMatakuliah(t, got, *item)

		}
	})
	t.Run("Testing Delete", func(t *testing.T) {
		m := model.Matakuliah{Kd_mk: dataInsertMatkul[0].Kd_mk}
		if err := m.Delete(db); err != nil {
			t.Fatal(err)
		}
		fmt.Println(m)
	})

}

func compareMatakuliah(t *testing.T, got, want model.Matakuliah) {
	if got.Kd_mk != want.Kd_mk {
		t.Fatalf("got : %s want :%s KdMK tidak sama", got.Kd_mk, want.Kd_mk)
	}
	if got.Mata_kuliah != want.Mata_kuliah {
		t.Fatalf("got :%s want :%s MataKuliah tidak Sama", got.Mata_kuliah, want.Mata_kuliah)
	}
}
