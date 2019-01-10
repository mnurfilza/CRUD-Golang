package main

import (
	"Latihan_crud/handler"
	"Latihan_crud/lib"
	"Latihan_crud/model"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os/exec"
)

var (
	dbUser    = "postgres"
	dbPass    = "rahasia"
	dbDefault = "postgres"
	dbUse     = "studentsite"
	notsecure = false
	port      = 8088
)

func main() {
	cmd := exec.Command("polymer", "build")
	cmd.Dir = fmt.Sprintf("frontend")
	err := cmd.Start()
	if err != nil {
		log.Printf("command Finished with error: %v", err.Error())
	}
	log.Printf("waiting for command to finish..")
	err = cmd.Wait()
	if err != nil {
		log.Printf("Command finished with error : %v", err.Error())
	}
	db, err := lib.Connect(dbUser, dbPass, dbUse)
	if err != nil {
		db, err = initDatabase()
		if err != nil {
			return
		}
	}
	defer db.Close()
	handler.RegisDB(db)

	http.HandleFunc("/api/ss/", handler.SS)
	polymer := http.FileServer(http.Dir("frontend/build/es6-bundled"))
	http.Handle("/", http.StripPrefix("/", polymer))

	log.Println("localhost : 8089")
	http.ListenAndServe(":8089", nil)
}

func initDatabase() (*sql.DB, error) {
	dbInit, err := lib.Connect(dbUser, dbPass, dbDefault)
	if err != nil {
		fmt.Println("error 1")
		return nil, err
	}
	//
	if err = lib.CreateDB(dbInit, dbUse); err != nil {
		fmt.Println("error 3")
		return nil, err
	}
	dbInit.Close()

	db, err := lib.Connect(dbUser, dbPass, dbDefault)
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
