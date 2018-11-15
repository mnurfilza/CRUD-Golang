package model

import (
	"Latihan_crud/lib"
	"database/sql"
)

type Mahasiswa struct {
	Nama  string
	NPM   string
	Kelas string
}

var TbMahasiswa string = `
CREATE TABLE mahasiswa (
	npm VARCHAR(10) PRIMARY KEY NOT NULL,
	nama VARCHAR(30) NOT NULL,
	kelas VARCHAR(5) NOT NULL
);
`

func (m *Mahasiswa) Name() string {
	return "mahasiswa"
}

func (m *Mahasiswa) Field() ([]string, []interface{}) {
	fields := []string{"npm", "nama", "kelas"}
	dst := []interface{}{&m.NPM, &m.Nama, &m.Kelas}
	return fields, dst
}
func (m *Mahasiswa) PrimaryKey() ([]string, []interface{}) {
	fields := []string{"npm"}
	dst := []interface{}{&m.NPM}
	return fields, dst
}

func (m *Mahasiswa) Structur() lib.Table {
	return &Mahasiswa{}
}
func (m *Mahasiswa) AutoNumber() bool {
	return false
}

func (m *Mahasiswa) Insert(db *sql.DB) error {
	return lib.Insert(db, m)

}
func (m *Mahasiswa) Delete(db *sql.DB) error {
	return lib.Delete(db, m)
}

func (m *Mahasiswa) Get(db *sql.DB) error {
	return lib.Get(db, m)
}

func (m *Mahasiswa) Update(db *sql.DB, data map[string]interface{}) error {
	return lib.Update(db, m, data)
}

func GetAllMahasiswa(db *sql.DB, params ...string) ([]*Mahasiswa, error) {
	m := &Mahasiswa{}
	data, err := lib.Gets(db, m, params...)
	if err != nil {
		return nil, err
	}
	mahasiswa := make([]*Mahasiswa, len(data))
	for index, item := range data {
		mahasiswa[index] = item.(*Mahasiswa)
	}
	return mahasiswa, nil

}

// var TabelMahasiswa = lib.Table{
// 	Name: "mahasiswa",
// 	Field: []string{
// 		"npm VARCHAR(10) PRIMARY KEY NOT NULL",
// 		"nama VARCHAR(30) NOT NULL",
// 		"kelas VARCHAR(5) NOT NULL",
// 	},
// }

// func (m *Mahasiswa) Delete(db *sql.DB) error {
// 	query := "DELETE FROM mahasiswa WHERE npm = $1"
// 	_, err := db.Exec(query, m.NPM)
// 	return err
// }

// func (m *Mahasiswa) SelectAllMahasiswa(db *sql.DB) error {
// 	query := "SELECT * FROM mahasiswa WHERE npm = $1"
// 	err := db.QueryRow(query, m.NPM).Scan(&m.NPM, &m.Nama, &m.Kelas)
// 	return err
// }
