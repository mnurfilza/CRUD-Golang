package model

import (
	"Latihan_crud/lib"
	"database/sql"
)

type Nilai struct {
	IdNilai int
	Kd_mk   string
	NPM     string
	UAS     int
	UTS     int
	Total   int
	Index   string
}

var TbNilai string = `
CREATE TABLE nilai(
	idNilai SERIAL PRIMARY KEY NOT NULL,
	kd_mk VARCHAR(10)NOT NULL,
	NPM VARCHAR(35)NOT NULL,
	UAS INT(5)NOT NULL,
	UTS INT(5)NOT NULL,
	total INT(5)NOT NULL,
	index VARCHAR(5)NOT NULL
);
`

func (n *Nilai) Name() string {
	return "nilai"
}

func (n *Nilai) Field() ([]string, []interface{}) {
	fields := []string{"IdNilai", "kd_mk", "NPM", "UAS", "UTS", "total", "index"}
	dst := []interface{}{&n.IdNilai, &n.Kd_mk, &n.NPM, &n.UAS, &n.UTS, &n.Total, &n.Index}
	return fields, dst
}

func (n *Nilai) PrimaryKey() ([]string, []interface{}) {
	fields := []string{"IdNilai"}
	dst := []interface{}{&n.IdNilai}
	return fields, dst

}

func (n *Nilai) Structur() lib.Table {
	return &Nilai{}
}

func (n *Nilai) Insert(db *sql.DB) error {
	result := 0
	if n.UAS != 0 && n.UTS != 0 {
		n.Index = "E"
	}
	result = n.UTS + n.UAS/2
	var z uint = uint(result)
	if z > 85 {
		n.Index = "A"
	} else if z > 75 {
		n.Index = "B"
	} else {
		n.Index = "E"
	}
	return lib.Insert(db, n)
}

func (n *Nilai) Delete(db *sql.DB) error {
	return lib.Delete(db, n)
}

func (n *Nilai) Get(db *sql.DB) error {
	return lib.Get(db, n)
}

func (n *Nilai) Update(db *sql.DB, data map[string]interface{}) error {
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
