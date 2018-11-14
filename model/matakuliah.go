package model

import (
	"Latihan_crud/lib"
	"database/sql"
)

type Matakuliah struct {
	Kd_mk       string
	Mata_kuliah string
}

var TbMatkul string = `  
	CREATE TABLE mata_kuliah(
		kd_mk VARCHAR(10) PRIMARY KEY NOT NULL,
		mata_kuliah VARCHAR(35)NOT NULL
	);

`

func (k *Matakuliah) Name() string {
	return "mata_kuliah"
}

func (k *Matakuliah) Field() ([]string, []interface{}) {
	fields := []string{"kd_mk", "mata_kuliah"}
	dst := []interface{}{&k.Kd_mk, &k.Mata_kuliah}
	return fields, dst
}
func (k *Matakuliah) PrimaryKey() ([]string, []interface{}) {
	fields := []string{"kd_mk"}
	dst := []interface{}{&k.Kd_mk}
	return fields, dst
}
func (k *Matakuliah) Structur() lib.Table {
	return &Matakuliah{}
}
func (k *Matakuliah) Insert(db *sql.DB) error {
	return lib.Insert(db, k)
}
func (k *Matakuliah) Delete(db *sql.DB) error {
	return lib.Delete(db, k)
}
func (k *Matakuliah) Get(db *sql.DB) error {
	return lib.Get(db, k)
}
func (k *Matakuliah) Update(db *sql.DB, data map[string]interface{}) error {
	return lib.Update(db, k, data)
}
func GetAllMatakuliah(db *sql.DB, params ...string) ([]*Matakuliah, error) {
	m := &Matakuliah{}
	data, err := lib.Gets(db, m, params...)
	if err != nil {
		return nil, err
	}
	matkul := make([]*Matakuliah, len(data))
	for index, item := range data {
		matkul[index] = item.(*Matakuliah)
	}
	return matkul, nil

}
