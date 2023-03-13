import Parse from 'parse/dist/parse.min.js';


export async function getMenu(currentUserId) {
    try {
        let result = [];
        if (currentUserId !== "") {
            let user = Parse.User.current();
            let companyQuery = user.get("company").query();
            let companyList = await companyQuery.find();
            let company = companyList[0];
           
            let menuQuery = company.get("menu").query();
            let menuList = await menuQuery.find(); // menu list of the company has the logged user
            let menu = menuList[0];
            let categoriesQuery = menu.get("categories").query();
            let categoriesList = await categoriesQuery.find();
            let categoriesList2 = [...categoriesList];
           
            for (let i=0; i< categoriesList.length ; i++) {
                categoriesList[i] = categoriesList[i].toJSON();
            }
           
           
            result.push(categoriesList);
            // for (let k = 0; k < result[0].length; k++) {
            //     for (let j = 0; j < result[0].length - k - 1; j++) {
            //         if (result[0][j + 1].priority < result[0][j].priority) {
            //             [result[0][j + 1], result[0][j]] = [result[0][j], result[0][j + 1]]
            //         }
            //     }
            // }
            let secondarr = [];
            for (let i = 0; i < categoriesList.length; i++) {
                const element = categoriesList2[i];
                let itemQuery = element.get("items").query();
                let itemList = await itemQuery.find();
               
                for (let j = 0 ; j< itemList.length; j++) {
                    itemList[j] = itemList[j].toJSON();
                }
               
                secondarr.push(itemList);
            }
            result.push(secondarr);
            for (let i = 0; i < result[1].length; i++) {
                for (let k = 0; k < result[1][i].length; k++) {
                    for (let j = 0; j < result[1][i].length - k - 1; j++) {
                        if (result[1][i][j + 1].priority < result[1][i][j].priority) {
                            [result[1][i][j + 1], result[1][i][j]] = [result[1][i][j], result[1][i][j + 1]]
                        }
                    }
                }
            }
           
            return result;
        }
    } catch (error) {
       
    }

}

export async function getUserPermissions(level) {
    try {
       
        let roleQuery = new Parse.Query(Parse.Role);
        roleQuery.equalTo('name', level);
        const lvl = await roleQuery.find();
        const lvll = lvl[0];
        let elm = { menuStyleEdit: lvll.get("menuStyleEdit"), userManipulation: lvll.get("userManipulation"), menuItemEdit: lvll.get("menuItemEdit"), shiftManipulation: lvll.get("shiftManipulation"), tableManipulation: lvll.get("tableManipulation"), notificationCancel: lvll.get("notificationCancel") };
        return elm;
        
    } catch (error) {
       
    }
}

export async function getUsersandRoles(currentUserId) {
    let result = [];
    try {    
        if (currentUserId !== "") {
        const User = new Parse.User();
        let userQuery = new Parse.Query(User);
        let user = await userQuery.get(currentUserId);
        let companyQuery = user.get("company").query();
        let companyList = await companyQuery.find();
        let company = companyList[0];
        //console.log("company", company);
        let usersQuery = company.get("users").query();
        let userList = await usersQuery.find();

        for (let i =0; i<userList.length ; i++) {
            userList[i] = userList[i].toJSON();
        }
        //console.log(userList);
        //console.log(company.get("mainCompanyName"))
        result.push(userList);
        let rolesQuery = company.get("roles").query();
        let roleList = await rolesQuery.find();
        for (let i =0; i<roleList.length ; i++) {
            roleList[i] = roleList[i].toJSON();
        }
        result.push(roleList);
        //console.log(result)
        return result    
    }
        
    } catch (error) {
       
    }
}


export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export const validateNonEmptyInput = (value) => {
    return value?.length != 0 ? true:false;
}

export const numericalInput = (value) => {
    if (!validateNonEmptyInput(value)) {
        return false;
    }
    if (!isNaN(value) && value.toString().indexOf('.') != -1){
        return true;
    }
    if(!isNaN(value)){
        return true;
    }
    return false;
}