export const addIcon = async (name, checked) => {
  if (name == "vegan") {
    setVegan(checked);
  }
  if (name == "glass") {
    setGlass(checked);
  }
  if (name == "star") {
    setStar(checked);
  }
  if (name == "fire") {
    setFire(checked);
  }
  if (name == "hot_beverage") {
    setHot_beverage(checked);
  }
  if (name == "hot_pepper") {
    setHot_pepper(checked);
  }
  setIconPermissions((oldArray) => [
    ...oldArray,
    [itemElement.objectId, name, checked],
  ]);
};

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

 export const removeFile = async (itemId, catIdx, itemIdx) => {
    try {
      setIsSaving(true)
      let Item = Parse.Object.extend("Item")
      let itemQuery = new Parse.Query(Item)
      let itemElement = await itemQuery.get(itemId)
      itemElement.set("image", null);
      data[1][catIdx][itemIdx].image = {}
      await itemElement.save();
      setIsSaving(false)
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
  }

  export const storeFileItem = async (id, file) => {
    try {
      setUpdatedItem(id);
      setIsSaving(true);
      var name = file.name;
      let newFile = await toBase64(file);
      var parseFile = new Parse.File(name, { base64: newFile });
      let Item = Parse.Object.extend("Item");
      let itemQuery = new Parse.Query(Item);
      let item = await itemQuery.get(id);
      item.set("image", parseFile);
      await item.save();
      data[1][catIdx][itemIdx].image = await item.get("image");
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
    setIsSaving(false);
  }


  export let history = useNavigate();
  const getData = async () => {
    let d = await getMenu(Parse.User.current()._getId());
    setData(d);
   
    setLoading(false);
  }

  /*export const is_auth = async () =>{
    let currentUserRole = await Parse.User.current().get("level");
    let Role = Parse.Object.extend("Role");
    const query = new Parse.Query(Role);
    query.equalTo('name', currentUserRole);
   
    let role = await query.find().first();
   
    let is_authorized = await role.get("menuItemEdit");
   
    if(!is_authorized){
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      history('infosortdashboard.b4a.app/log-in');
    }
  }*/




  export const addItem = async (catId, catIdx, e, type) => {
    if(type == "mouseClick" || (e.charCode == 13 && type == "enter")){
      try {
        let priority = 0;
        if (data[1][catIdx].length !== 0) { priority = data[1][catIdx].length; }
        let Category = Parse.Object.extend('Category');
        let categoryQuery = new Parse.Query(Category);
        let category = await categoryQuery.get(catId);
        let relation = category.relation("items");
        let Item = Parse.Object.extend('Item');
        let item = new Item();
        item.set("name", currentChangeName);
        item.set("price", currentChangePrice);
        item.set("ingredients", currentChangeIngredients);
        item.set("priority", priority);
        item.set("categoryId", catId);
        if (currentChangeName !== "" && currentChangePrice !== 0) { await item.save(); }
        setCurrentChangeName("");
        setCurrentChangePrice("");
        setCurrentChangeIngredients("");
        setIsSaving(true);
        data[1][catIdx].push({ objectId: item._getId(), name: currentChangeName, price: currentChangePrice, ingredients: currentChangeIngredients, class: "item", priority: priority, permissions: {} })
        setIsSaving(false);
        relation.add(item);
        await category.save();
      } catch (error) {
        alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      }
      setIsItemAdding(false);
    }
  }
  export const deleteCategory = async (id, index) => {
    try {
      let Category = Parse.Object.extend('Category');
      let categoryQuery = new Parse.Query(Category);
      let category = await categoryQuery.get(id);
      await category.destroy();
      setIsSaving(true);
      await data[0].splice(index, 1);
      await data[1].splice(index, 1);
      setIsSaving(false);
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
  }
  export const editCategory = async (catIdx, catId, e, type) => {
    if(type=="mouseClick" || (e.charCode == 13 && type=="enter")){
      let Category = Parse.Object.extend('Category');
      let categoryQuery = new Parse.Query(Category);
      let category = await categoryQuery.get(catId);
      if (categoryName != "") {
        category.set("name", categoryName);
        setCategoryName('');
        await category.save();
        setIsSaving(true);
        data[0][catIdx].name = categoryName;
        setIsSaving(false);
      }
      setEditCat(false);
    }
  }
  export const addCategory = async (e,type) => {
    if(type == "mouseClick" || (e.charCode == 13 && type=="enter")){
      try {
        setIsSaving(true);
        let user = Parse.User.current();
        let companyQuery = user.get('company').query()
        let companyList = await companyQuery.find()
        let company = companyList[0];
        let menuQuery = company.get("menu").query();
        let menuList = await menuQuery.find()
        let menu = menuList[0];
        let categoryRelation = menu.relation("categories");
        let Category = Parse.Object.extend('Category');
        let category = new Category();
        category.set("name", catName);
        setCatName('');
        let priority = 0;
        if (data[0].length !== 0) { priority = data[0][data[0].length - 1].priority + 1; }
       
        category.set("priority", priority);
        await category.save();
        await categoryRelation.add(category);
        await menu.save();
        setIsSaving(false);
        setIsSaving(true);
        await data[0].push({ objectId: category._getId(), name: catName, class: "category", priority: priority })
        await data[1].push([]);
        setIsSaving(false);
        setOpenCatAdd(false);
      } catch (error) {
        alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      }
    }
  }


  export const cancelEdit = async () => {
    setEdit(false);
    setCurrentItemId("");
    setCurrentChangeName("");
    setCurrentChangeIngredients("");
    setCurrentChangePrice("");
  }


  export const cancelUpdatedList = async () => {
    window.location.reload();
  }
  export const saveUpdatedList = async () => {
    let Item = Parse.Object.extend('Item');
    let itemQuery = new Parse.Query(Item);
    setIsSaving(true);
    for (let catI = 0; catI < data[0].length; catI++) {
      for (let itemI = 0; itemI < data[1][catI].length; itemI++) {
        let id = data[1][catI][itemI].objectId;
        let item = await itemQuery.get(id);
        item.set("priority", itemI);
        await item.save();
      }
    }
    setIsSaving(false);
  }

  export const storeFileCategory = async (id, file, catIdx) => {
    try {
      setUpdatedCategory(id);
      setIsSaving(true);
      var name = file.name;
      let newFile = await toBase64(file);
      var parseFile = new Parse.File(name, { base64: newFile });
      let Category = Parse.Object.extend("Category");
      let categoryQuery = new Parse.Query(Category);
      let category = await categoryQuery.get(id);
      category.set("image", parseFile);
      await category.save();
     
      data[0][catIdx].image = await category.get("image");
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
    setIsSaving(false);
  }

  export const saveColors = async (primaryColor, secondaryColor, backgroundColor) => {
    try {
    let user = Parse.User.current();
    let companyQuery = user.get('company').query()
    let companyList = await companyQuery.find()
    let company = companyList[0];
    let menuQuery = company.get("menu").query();
    let menuList = await menuQuery.find()
    let menu = menuList[0]; 
    menu.set("primaryColor", primaryColor);
    menu.set("secondaryColor", secondaryColor);
    menu.set("backgroundColor", backgroundColor);
    await menu.save();
    setOpenColorBox(false);
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
  }
  export const getColor = async () => {
    let user = Parse.User.current();
    let companyQuery = user.get('company').query()
    let companyList = await companyQuery.find()
    let company = companyList[0];
    let menuQuery = company.get("menu").query();
    let menuList = await menuQuery.find()
    let menu = menuList[0]; 
    
    let primaryColor = menu.get("primaryColor")
    let secondaryColor = menu.get("secondaryColor")
    let backgroundColor = menu.get("backgroundColor")
    
    return {
        primary: primaryColor,
        secondary: secondaryColor,
        background: backgroundColor,
    }
  }