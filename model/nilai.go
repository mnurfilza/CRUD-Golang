package model

import (
	"Latihan_crud/lib"
	"database/sql"
	"fmt"
)

type Nilai struct {
	IdNilai int     `json:"idnilai"`
	Kd_mk   string  `json:"kode_matkul"`
	NPM     string  `json:"npm"`
	UAS     float64 `json:"uas"`
	UTS     float64 `json:"uts"`
	Total   float64 `json:"total"`
	Index   string  `json:"index"`
}

var TbNilai string = `
CREATE TABLE nilai (
	idnilai SERIAL PRIMARY KEY,
	kd_mk VARCHAR(10) NOT NULL,
	npm VARCHAR(35) NOT NULL,
	uas INT NOT NULL,
	uts INT NOT NULL,
	total INT NOT NULL,
	grade VARCHAR(5) NOT NULL
);
`

func (n *Nilai) Name() string {
	return "nilai"
}

func (n *Nilai) Field() ([]string, []interface{}) {
	fields := []string{"Idnilai", "kd_mk", "npm", "uas", "uts", "total", "grade"}
	n.Total = 0
	if n.UAS != 0 && n.UTS != 0 {
		n.Index = "E"
	}
	n.Total = (n.UTS + n.UAS) / 2

	var z uint = uint(n.Total)
	if z > 85 {
		n.Index = "A"
	} else if z > 75 {
		n.Index = "B"
	} else {
		n.Index = "E"
	}
	dst := []interface{}{&n.IdNilai, &n.Kd_mk, &n.NPM, &n.UAS, &n.UTS, &n.Total, &n.Index}
	return fields, dst
}

func (n *Nilai) PrimaryKey() ([]string, []interface{}) {
	fields := []string{"idnilai"}
	dst := []interface{}{&n.IdNilai}
	return fields, dst

}

func (n *Nilai) Structur() lib.Table {
	return &Nilai{}
}

func (n *Nilai) AutoNumber() bool {
	return true

}
func (n *Nilai) Insert(db *sql.DB) error {
	return lib.Insert(db, n)
}

func (n *Nilai) Delete(db *sql.DB) error {
	return lib.Delete(db, n)
}

func (n *Nilai) Get(db *sql.DB) error {
	return lib.Get(db, n)
}

func (n *Nilai) Update(db *sql.DB, data map[string]interface{}) error {
	_, utsOk := data["uts"]
	_, uasOk := data["uas"]
	if utsOk || uasOk {
		if err := n.Get(db); err != nil {
			return err
		}
		uts := n.UTS
		uas := n.UAS
		if utsOk {
			uts = data["uts"].(float64)
		}
		if uasOk {
			uas = data["uas"].(float64)
		}
		total := int((float64(uts) + float64(uas)) / 2)
		var grade string
		switch {
		case total > 80:
			grade = "A"
		case total > 70:
			grade = "B"
		case total > 60:
			grade = "C"
		case total > 50:
			grade = "D"
		default:
			grade = "E"
		}
		data["grade"] = grade
		data["total"] = total
		fmt.Println(data["grade"])
	}

	return lib.Update(db, n, data)
}

func GetAllNilai(db *sql.DB, params ...string) ([]*Nilai, error) {
	m := &Nilai{}
	data, err := lib.Gets(db, m, params...)
	if err != nil {
		return nil, err
	}
	nilai := make([]*Nilai, len(data))
	for index, item := range data {
		nilai[index] = item.(*Nilai)
	}
	return nilai, nil

}
