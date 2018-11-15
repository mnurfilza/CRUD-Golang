package test

import (
	"Latihan_crud/model"
	"fmt"
	"testing"
)

func TestInsertMhs(t *testing.T) {
	var dataInsertMahasiswa = []model.Mahasiswa{
		model.Mahasiswa{NPM: "1234567890", Nama: "AIRTAS", Kelas: "5KA34"},
		model.Mahasiswa{NPM: "1233255422", Nama: "SARITAS", Kelas: "5KA14"},
		model.Mahasiswa{NPM: "1232341233", Nama: "UNIRAS", Kelas: "5KA24"},
		model.Mahasiswa{NPM: "1232455644", Nama: "DIA", Kelas: "5KA12"},
		model.Mahasiswa{NPM: "1223131454", Nama: "NOVI", Kelas: "5KA12"},
	}
	db, err := initDatabase()

	if err != nil {
		t.Fatal(err)
	}

	defer db.Close()

	t.Run("Testing Insert Get Mahasiswa", func(t *testing.T) {
		for _, dataInsert := range dataInsertMahasiswa {
			err := dataInsert.Insert(db)
			if err != nil {
				t.Fatal(err)
			}
			got := model.Mahasiswa{NPM: dataInsert.NPM}
			if err := got.Get(db); err != nil {
				t.Fatal(err)
			}
			compareMahasiswa(t, got, dataInsert)
		}
	})

	t.Run("Testing Update Get", func(t *testing.T) {
		update := map[string]interface{}{
			"nama": "AIRTAS",
		}

		dataUpdate := dataInsertMahasiswa[0]
		if err := dataUpdate.Update(db, update); err != nil {
			t.Fatal(err)
		}
		got := model.Mahasiswa{NPM: dataUpdate.NPM}
		if err := got.Get(db); err != nil {
			t.Fatal(err)
		}
		compareMahasiswa(t, got, dataUpdate)

	})

	t.Run("Testing Gets", func(t *testing.T) {
		result, err := model.GetAllMahasiswa(db)
		if err != nil {
			t.Fatal(err)
		}
		for _, item := range result {
			got := model.Mahasiswa{NPM: item.NPM}
			if err := got.Get(db); err != nil {
				t.Fatal(err)
			}
			compareMahasiswa(t, got, *item)
		}
	})

	t.Run("testing Gets with Paramaters", func(t *testing.T) {
		params := "nama,=,DIA"
		result, err := model.GetAllMahasiswa(db, params)
		if err != nil {
			t.Fatal(err)
		}
		for _, item := range result {
			got := model.Mahasiswa{NPM: item.NPM}
			if err := got.Get(db); err != nil {
				t.Fatal(err)
			}
			compareMahasiswa(t, got, *item)
		}

	})
	t.Run("Testing Delete", func(t *testing.T) {
		m := model.Mahasiswa{NPM: dataInsertMahasiswa[0].NPM}
		if err := m.Delete(db); err != nil {
			t.Fatal(err)
		}
		fmt.Println(m)
	})

}
func compareMahasiswa(t *testing.T, got, want model.Mahasiswa) {
	if got.NPM != want.NPM {
		t.Fatalf("got : %s want :%s npm tidak sama", got.NPM, want.NPM)
	}
	if got.Nama != want.Nama {
		t.Fatalf("got :%s want :%s Nama tidak Sama", got.Nama, want.Nama)
	}
	if got.Kelas != want.Kelas {
		t.Fatalf("got :%s want :%s Nama tidak Sama", got.Kelas, want.Kelas)
	}

}
