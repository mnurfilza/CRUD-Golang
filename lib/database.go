package lib

import (
	"database/sql"
	"fmt"
	"strings"

	_ "github.com/lib/pq"
)

type Table interface {
	Name() string
	Field() ([]string, []interface{})
	PrimaryKey() ([]string, []interface{})
	Structur() Table
	AutoNumber() bool
}

// type Table struct {
// 	Name  string
// 	Field []string
// }

func Connect(username, password, database string) (*sql.DB, error) {
	conn := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", username, password, database)
	db, err := sql.Open("postgres", conn)
	return db, err
}

func DropDB(db *sql.DB, name string) error {
	query := fmt.Sprintf("DROP DATABASE  %v", name)
	_, err := db.Exec(query)
	return err
}

func CreateDB(db *sql.DB, name string) error {
	query := fmt.Sprintf("CREATE DATABASE %v", name)
	_, err := db.Exec(query)
	return err
}

// func DropTable(db *sql.DB, table Table) error {
// 	query := fmt.Sprintf("DROP TABLE %v", table.Name)
// 	_, err := db.Exec(query)
// 	return err
// }

// func CreateTable(db *sql.DB, table Table) error {
// 	query := fmt.Sprintf("CREATE TABLE %v (%v)", table.Name, strings.Join(table.Field, ","))
// 	_, err := db.Exec(query)
// 	return err
// }

func CreateTable(db *sql.DB, query string) error {
	_, err := db.Exec(query)
	return err
}

func Insert(db *sql.DB, t Table) error {
	fields, dst := t.Field()
	fieldsPK, dstPK := t.PrimaryKey()
	var err error
	if t.AutoNumber() {
		query := fmt.Sprintf("INSERT INTO %s(%s) VALUES (%s) RETURNING %s", t.Name(), strings.Join(fields[1:], ","), ToVariable(t), fieldsPK[0])
		err = db.QueryRow(query, dst[1:]...).Scan(dstPK...)
	} else {
		query := fmt.Sprintf("INSERT INTO %s(%s) VALUES (%s)", t.Name(), strings.Join(fields, ","), ToVariable(t))
		_, err = db.Exec(query, dst...)
	}
	return err

}

func Delete(db *sql.DB, t Table) error {
	fields, dst := t.PrimaryKey()
	query := fmt.Sprintf("DELETE FROM %s WHERE %s = $1", t.Name(), fields[0])
	_, err := db.Exec(query, dst[0])
	return err

}

func Get(db *sql.DB, t Table) error {
	fieldsPK, dstPK := t.PrimaryKey()
	_, dst := t.Field()
	query := fmt.Sprintf("SELECT * FROM %s WHERE %s = $1", t.Name(), fieldsPK[0])
	err := db.QueryRow(query, dstPK[0]).Scan(dst...)
	return err

}
func ToVariable(t Table) string {
	fields, _ := t.Field()
	var temp []string
	lenFields := len(fields)
	if t.AutoNumber() {
		lenFields -= 1
	}
	for i := 1; i <= lenFields; i++ {
		temp = append(temp, fmt.Sprintf("$%d", i))

	}
	var result = strings.Join(temp, ",")
	return result
}

func Update(db *sql.DB, t Table, data map[string]interface{}) error {
	fields, dst := t.PrimaryKey()
	var kolom = []string{}
	var args []interface{}
	args = append(args, dst[0])
	i := 2
	for key, value := range data {
		updateData := fmt.Sprintf("%v = $%d", strings.ToLower(key), i)
		kolom = append(kolom, updateData)
		args = append(args, value)
		i++
	}
	dataUpdate := strings.Join(kolom, ",")
	query := fmt.Sprintf("UPDATE %s SET %s WHERE %s = $1 ", t.Name(), dataUpdate, fields[0])
	fmt.Println(query)
	_, err := db.Exec(query, args...)
	return err
}

func Gets(db *sql.DB, t Table, params ...string) ([]Table, error) {
	var kolom = []string{}
	var args []interface{}
	if len(params) != 0 {
		if params[0] != "" {
			dataParams := strings.Split(params[len(params)-1], ";")
			for i, v := range dataParams {
				temp := strings.Split(fmt.Sprintf("%s", v), ",")
				where := fmt.Sprintf("%s %s $%d", strings.ToLower(temp[0]), temp[1], i+1)
				kolom = append(kolom, where)
				args = append(args, temp[2])

			}
		}
	}
	dataKondisi := strings.Join(kolom, " AND ")
	query := fmt.Sprintf("SELECT * FROM %s", t.Name())
	if dataKondisi != "" {
		query += " WHERE " + dataKondisi
	}

	data, err := db.Query(query, args...)
	if err != nil {
		return nil, err
	}

	defer data.Close()

	var result []Table
	for data.Next() {
		each := t.Structur()
		_, dst := each.Field()
		var err = data.Scan(dst...)
		if err != nil {
			return nil, err
		}
		result = append(result, each)
	}

	return result, nil
}
