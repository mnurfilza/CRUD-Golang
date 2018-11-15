package test

import (
	"Latihan_crud/model"
	"fmt"
	"testing"
)

func TestNilai(t *testing.T) {
	var dataInsertNilai = []model.Nilai{
		model.Nilai{Kd_mk: "pa2", NPM: "12345678", UAS: 75, UTS: 75},
		model.Nilai{Kd_mk: "la2", NPM: "11111111", UAS: 75, UTS: 75},
		model.Nilai{Kd_mk: "sa2", NPM: "33333333", UAS: 75, UTS: 75},
		model.Nilai{Kd_mk: "ea2", NPM: "44444444", UAS: 75, UTS: 75},
		model.Nilai{Kd_mk: "ba2", NPM: "55555555", UAS: 75, UTS: 75},
	}

	db, err := initDatabase()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	t.Run("testing Insert Get nilai", func(t *testing.T) {
		for _, dataInsert := range dataInsertNilai {
			err := dataInsert.Insert(db)
			if err != nil {
				t.Fatal(err)
			}
			got := model.Nilai{Kd_mk: dataInsert.Kd_mk}

			fmt.Println(got)
			// if err := got.Get(db); err != nil {
			// 	t.Fatal(err)
			// }
			// compareNilai(t, got, dataInsert)
		}
	})
}

func compareNilai(t *testing.T, got, want model.Nilai) {
	if got.Kd_mk != want.Kd_mk {
		t.Fatalf("got : %s want :%s KdMK tidak sama", got.Kd_mk, want.Kd_mk)
	}
	if got.NPM != want.NPM {
		t.Fatalf("got :%s want :%s MataKuliah tidak Sama", got.NPM, want.NPM)
	}
}
