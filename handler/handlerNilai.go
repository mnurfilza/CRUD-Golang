package handler

import (
	"Latihan_crud/model"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
)

func HandlerNilaiPost(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var data model.Nilai
	if err = json.Unmarshal(body, &data); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err = data.Insert(db); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonData, err := json.Marshal(data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Write(jsonData)
}

func HandlerNilaiDelete(w http.ResponseWriter, r *http.Request) {
	lastIndex := LastIndex(r)
	i, err := strconv.Atoi(lastIndex)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	data := model.Nilai{IdNilai: i}
	if err := data.Delete(db); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Write([]byte("true"))
}

func HandlerNilaiPut(w http.ResponseWriter, r *http.Request) {
	lastIndex := LastIndex(r)
	fmt.Println("1")
	// i, err := strconv.Atoi(lastIndex)
	// if err != nil {
	// 	fmt.Println("2")
	// 	http.Error(w, err.Error(), http.StatusBadRequest)
	// }
	fmt.Println("3")
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("4")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("5")
	jsonmap := make(map[string]interface{})
	err = json.Unmarshal(body, &jsonmap)
	if err != nil {
		fmt.Println("6")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("7")
	fmt.Printf("%T\n", lastIndex)
	i, _ := strconv.Atoi(lastIndex)
	fmt.Printf("%T\n", i)
	data := model.Nilai{IdNilai: i}
	err = data.Update(db, jsonmap)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := data.Get(db); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("9")
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("10")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("11")
	w.Write(jsonData)
}

func HandlerNilaiGet(w http.ResponseWriter, r *http.Request) {
	lastIndex := LastIndex(r)
	if lastIndex == "nilai" {
		data, err := model.GetAllNilai(db)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		jsonData, _ := json.Marshal(data)
		w.Write(jsonData)

	} else {
		i, _ := strconv.Atoi(lastIndex)
		data := model.Nilai{IdNilai: i}
		err := data.Get(db)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jsonData, err := json.Marshal(data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write(jsonData)
	}

}
