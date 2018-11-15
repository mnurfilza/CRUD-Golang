package test

import (
	"Latihan_crud/lib"
	"Latihan_crud/model"
	"database/sql"
	"fmt"
	"testing"
)

var username, password, namaDatabase, databaseDefault string

func init() {
	username = "postgres"
	password = "rahasia"
	namaDatabase = "latihancrud"
	databaseDefault = "postgres"
}
func TestDatabase(t *testing.T) {
	t.Run("Testing untuk koneksi postgres Database ", func(t *testing.T) {
		db, err := lib.Connect(username, password, databaseDefault)

		defer db.Close()

		if err != nil {
			t.Fatal(err)
		}

	})
	t.Run("Testing Untuk Drop Databse ", func(t *testing.T) {
		db, err := lib.Connect(username, password, databaseDefault)

		defer db.Close()

		if err != nil {
			t.Fatal(err)
		}

		err = lib.DropDB(db, namaDatabase)

		if err != nil {
			t.Fatal(err)
		}
	})
	t.Run("Testing Untuk Create Databse ", func(t *testing.T) {
		db, err := lib.Connect(username, password, databaseDefault)

		defer db.Close()

		if err != nil {
			t.Fatal(err)
		}

		err = lib.CreateDB(db, namaDatabase)

		if err != nil {
			t.Fatal(err)
		}
	})

}

// func TestTableMahasiswa(t *testing.T) {
// 	// t.Run("Testing Untuk Drop Databse ", func(t *testing.T) {
// 	// 	db, err := lib.Connect(username, password, namaDatabase)

// 	// 	defer db.Close()

// 	// 	if err != nil {
// 	// 		t.Fatal(err)
// 	// 	}

// 	// 	if err = lib.DropTable(db, model.TbMahasiswa); err != nil {
// 	// 		t.Fatal(err)
// 	// 	}
// 	// })
// 	t.Run("Testing Untuk Create Databse ", func(t *testing.T) {
// 		db, err := lib.Connect(username, password, namaDatabase)
// 		defer db.Close()

// 		if err != nil {
// 			t.Fatal(err)
// 		}
// 		err = lib.CreateTable(db, model.TbMahasiswa)
// 		if err != nil {
// 			t.Fatal(err)
// 		}
// 	})

// }

func initDatabase() (*sql.DB, error) {
	dbInit, err := lib.Connect(username, password, databaseDefault)
	if err != nil {
		fmt.Println("error 1")
		return nil, err
	}
	if err = lib.DropDB(dbInit, namaDatabase); err != nil {
		fmt.Println("error 2")
		return nil, err
	}
	if err = lib.CreateDB(dbInit, namaDatabase); err != nil {
		fmt.Println("error 3")
		return nil, err
	}
	dbInit.Close()

	db, err := lib.Connect(username, password, namaDatabase)
	if err != nil {
		fmt.Println("error 4")
		return nil, err
	}
	if err = lib.CreateTable(db, model.TbMahasiswa); err != nil {
		fmt.Println("error 5")
		return nil, err
	}
	if err = lib.CreateTable(db, model.TbMatkul); err != nil {

		fmt.Println("error 6")
		return nil, err
	}
	if err = lib.CreateTable(db, model.TbNilai); err != nil {
		fmt.Println("error 7")
		return nil, err
	}
	return db, nil
}
