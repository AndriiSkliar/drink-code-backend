const { Drink, schemas } = require("../../models/drink"); // Подключение модели коктейлей

const getHomePageDrinks = async (req, res, next) => {
  try {
    // !Извлечение возраста из объекта пользователя в запросе (пока просто из body)
    const { age } = req.body;

    // console.log("age", age)
    // console.log("req.url", req.url)
    // console.log("req.method", req.method)
    // console.log("req.statusCode", req.statusCode, "req.statusMessage", req.statusMessage)
    // console.log("req.query", req.query)
    // console.log("req.body", req.body)
    // console.log("req.route", req.route)

    // Переменная для хранения списка коктейлей
    let drinks;

    // Логика выбора коктейлей в зависимости от возраста
    if (age < 18) {
      // Запрос на получение безалкогольных коктейлей для пользователей младше 18 лет,
      // отсортированных по убыванию даты создания и по убыванию идентификатора,
      // чтобы в первую очередь отображались последние добавленные
      drinks = await Drink.find({ alcoholic: "Non alcoholic" }).sort({
        createdAt: -1,
        _id: -1,
      });
      console.log("Запрос на безалкогольные коктейли");
    } else {
      // Запрос на получение всех коктейлей для пользователей старше 18 лет,
      // отсортированных по убыванию даты создания и по убыванию идентификатора,
      // чтобы в первую очередь отображались последние добавленные
      drinks = await Drink.find().sort({ createdAt: -1, _id: -1 });
      console.log("Запрос на все коктейли");
    }

    // Отправка JSON-ответа
    res.json(drinks);
  } catch (error) {
    // Передача ошибки на следующий обработчик
    next(error);
  }
};
module.exports = getHomePageDrinks;
