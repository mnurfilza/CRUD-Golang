package test

import (
	"Latihan_crud/model"
	"fmt"
	"testing"
)

func TestNilai(t *testing.T) {
	var dataInsertNilai = []model.Nilai{
		model.Nilai{
			Kd_mk: "pa2",
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

	db, err := initDatabase()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	t.Run("testing Insert Get nilai", func(t *testing.T) {
		for index, dataInsert := range dataInsertNilai {
			err := dataInsert.Insert(db)
			if err != nil {
				t.Fatal(err)
			}
			got := model.Nilai{IdNilai: index + 1}
			want := model.Nilai{IdNilai: index + 1,
				NPM:   dataInsert.NPM,
				Kd_mk: dataInsert.Kd_mk,
				UTS:   dataInsert.UTS,
				UAS:   dataInsert.UAS}

			if err := got.Get(db); err != nil {
				t.Fatal(err)
			}
			compareNilai(t, got, want)

		}
	})

	t.Run("Testing Delete Nilai", func(t *testing.T) {
		m := model.Nilai{IdNilai: 1}
		if err := m.Delete(db); err != nil {
			t.Fatal(err)
		}
		fmt.Println(m)
	})

	t.Run("Testing Update Get", func(t *testing.T) {
		update := map[string]interface{}{
			"uts": 60,
			"uas": 65,
		}

		dataUpdate := model.Nilai{IdNilai: 2}
		if err := dataUpdate.Update(db, update); err != nil {
			t.Fatal(err)
		}
		got := model.Nilai{IdNilai: dataUpdate.IdNilai}
		if err := got.Get(db); err != nil {
			t.Fatal(err)
		}
	})

}

func compareNilai(t *testing.T, got, want model.Nilai) {
	if got.NPM != want.NPM {
		t.Fatalf("got :%s want :%s NPM tidak Sama", got.NPM, want.NPM)
	}
	if got.Kd_mk != want.Kd_mk {
		t.Fatalf("got :%s want :%s MataKuliah tidak Sama", got.Kd_mk, want.Kd_mk)
	}
	if got.UTS != want.UTS {
		t.Fatalf("got :%v want :%v UTS tidak Sama", got.UTS, want.UTS)
	}
	if got.UAS != want.UAS {
		t.Fatalf("got :%v want :%v UAS tidak Sama", got.UAS, want.UAS)
	}
}
