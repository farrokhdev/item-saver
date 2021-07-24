import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalstorage=()=>{
  let List= localStorage.getItem("list");
  if(List){
    return JSON.parse(localStorage.getItem("list"))
  }
  else{
    return []
  }
}

function App() {
  const [input, setInput] = useState("");
  const [itemCat, setItemCat] = useState("");

  const [items, setItems] = useState(getLocalstorage());

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const saveItems = (e) => {
    e.preventDefault();
    if (!input || !itemCat) {
      // show alert
      showAlert(true, "please enter name and category!", "danger");
    } else if (input && itemCat && editing) {
      // deal with edit
      setItems(
        items.map((item) => {
          if (item.id === editId) {
            return { ...item, name: input, category: itemCat }
          }
          return item;
        })
      );
      setEditId(null);
      setEditing(false);
      setInput("");
      setItemCat("");
      showAlert(true, "item edited successfully", "success");
    } else {
      showAlert(true, "name and category added successfully :)", "success");
      const newItem = {
        id: new Date().getTime().toString(),
        name: input,
        category: itemCat
      };
      setItems([...items, newItem]);
      setInput("");
      setItemCat("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const clearAlert = () => {
    showAlert(true, "the list is empty", "danger");
    setItems("");
    setEditing(false);
  };
  const deleteItem = (id) => {
    showAlert(true, "item is deleted", "danger");
    setItems(items.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const editableItem = items.find((item) => item.id === id);
    setEditing(true);
    setEditId(id);
    setInput(editableItem.name);
    setItemCat(editableItem.category);
  };

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(items));
  },[items])

  // console.log(items);

  return (
    <section className="main">
      <div className="container">
        <div className="title">
          <h2>Item saver</h2>
        </div>
        <div className="form">
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} items={items} />
          )}
          <form action="" onSubmit={saveItems}>
            <div className="name-input">
              <label htmlFor="name">name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="type your item name!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="category-input">
              <label htmlFor="category">category</label>
              <input
                id="category"
                type="text"
                name="category"
                placeholder="type your item category!"
                value={itemCat}
                onChange={(e) => setItemCat(e.target.value)}
              />
            </div>
            <button className="submit" type="submit">
              {editing ? "edit" : "save"}
            </button>
          </form>
        </div>
        <div className="items">
          {items.length > 0 && (
            <List
              items={items}
              clearAlert={clearAlert}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
