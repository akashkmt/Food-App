if(localStorage.getItem('allFoodCategories')){
   let allFoodCategories = JSON.parse(localStorage.getItem('allFoodCategories'));
//    console.log(allFoodCategories);
    showSelect(allFoodCategories);
}
else{
    foodCategories();
}

async function foodCategories(){
    try{
        var result = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        var data = await result.json();
        let allFoodCategories = data.categories;
        localStorage.setItem('allFoodCategories', JSON.stringify(allFoodCategories));
        // console.log(allFood)
        showSelect(allFoodCategories);
    }
    catch(error){
        console.log(error);
    }
}

function showSelect(categories){
    var select = document.createElement('select');
    select.setAttribute('id', 'selectCategories')

    var option = document.createElement('option');
    option.innerText = 'Select Category';
    option.setAttribute('value',"");

    select.append(option);

    categories.forEach(element => {
        var option = document.createElement('option');
        option.innerText = element.strCategory;
        option.setAttribute('value',element.strCategory)

        select.append(option);
    });

    select.addEventListener('change', () => {
        // console.log(select.value);
        if(select.value == ""){
            document.querySelector('#container').innerHTML='';
        }
        else{
            foodItems(select.value);
        }
    })

    document.querySelector('#selectBox').append(select);
}

async function foodItems(category){
    try{
        var result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        var data = await result.json();
        let allFoodItems = data.meals;
        // console.log(allFoodItems);
        displayGrid(allFoodItems);
    }
    catch(error){
        console.log(error);
    }
}

function displayGrid(foodItems){
    document.querySelector('#container').innerHTML='';
    foodItems.forEach(element => {
        var div = document.createElement('div');
        div.setAttribute('class','containerDiv');

        var img = document.createElement('img');
        img.setAttribute('class', 'divImage');
        img.setAttribute('src', element.strMealThumb);

        var name = document.createElement('h4');
        name.innerText = element.strMeal;
        name.setAttribute('class', 'name');

        div.append(img, name);
        document.querySelector('#container').append(div);
    })
}