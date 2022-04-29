import axios from 'axios';

async function getAllItemsController(req, res) {
    const query = req.query.q
    const newArray = []
    axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=:${query}`)
    .then(function (response) {
        newArray.push({author: {name: "Samuel", lastname: "Buendía"}, categories: findCategorys(), items: [] })

        function findCategorys() {
            let arr = []
            if(response.data.filters[0]) {
                if(response.data.filters[0].values[0]) {
                    arr = response.data.filters[0].values[0].path_from_root
                }
            }
            const a = []
            arr.forEach(element => {
                a.push(element.name)
            });
            return a 
        }

        if (response.data.results.length > 0) {
            for (let i = 0; i < 4; i++) {
                const element = response.data.results[i];   
                newArray[0].items.push(
                    {
                        id: element.id,
                        title: element.title,
                        price: { 
                            currency: element.currency_id,
                            price: element.price
                        },
                        picture: element.thumbnail,
                        condition: element.condition,
                        free_shipping: element.shipping.free_shipping
                    }
                ) 
            }
        }

        return res.json(newArray)
       
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        console.log("entro");
        return res.json([{}])
    })
    .then(function () {
        console.log("Terminó");
    });
}

async function getItemByIdController(req, res) {
    const id = req.params.id
    const newArray = []
    await axios.get(`https://api.mercadolibre.com/items/${id}`)
    .then(function (response) {
        const element = response.data
        newArray.push({
            author: {name: "Samuel", lastname: "Buendía"}, 
            item: {
                id: element.id,
                title: element.title,
                price: { 
                    currency: element.currency_id,
                    price: element.price
                },
                picture: element.thumbnail,
                condition: element.condition,
                free_shipping: element.shipping.free_shipping,
                sold_quantity: element.sold_quantity,
            }
        })
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })

    await axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    .then(function (response) {
        const element = response.data
        newArray[0].item.description = element.plain_text

        return res.json(newArray)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        return res.json([{}])
    })
}

export { 
    getAllItemsController, 
    getItemByIdController
}