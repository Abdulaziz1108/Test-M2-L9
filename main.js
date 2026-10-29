const cinemaName = 'Galaxy'

let userBalance = 1000
let userAge = 16

const movies = [
    {
        title: 'Starwars',
        genre: 'Scifi',
        rating: 10,
        price: 1000,
        ageLimit: 18,
        availableSeats: 50
    },
    {
        title: 'Avangers',
        genre: 'Action',
        rating: 10,
        price: 2300,
        ageLimit: 16,
        availableSeats: 100
    },
    {
        title: 'Ninja Turtles',
        genre: 'Fantasy',
        rating: 9,
        price: 800,
        ageLimit: 12,
        availableSeats: 40
    },
    {
        title: 'No Name',
        genre: 'Nothing',
        rating: 5,
        price: 200,
        ageLimit: 8,
        availableSeats: 10
    },
    {
        title: 'Spider Man',
        genre: 'Action',
        rating: 8,
        price: 500,
        ageLimit: 12,
        availableSeats: 75
    }
]

function checkAccess(movie, userAge) {
    return userAge >= movie.ageLimit
}

for (let i = 0; i < movies.length; i++) {
    console.log(movies[i].title + ' - ' + movies[i].genre)
}

for (let i = 0; i < movies.length; i++) {
    if (movies[i].rating > 8) {
        console.log(movies[i].title + ' (рейтинг ' + movies[i].rating + ')')
    }
}

let totalSeats = 0
for (let i = 0; i < movies.length; i++) {
    totalSeats += movies[i].availableSeats
}
console.log('Всего свободных мест: ' + totalSeats)

function showMovie(movie) {
    console.log(
        movie.title + ', ' + movie.genre +
        ', рейтинг: ' + movie.rating +
        ', цена: ' + movie.price +
        ', возраст: ' + movie.ageLimit + '+' +
        ', мест: ' + movie.availableSeats
    )
}

function calculatePrice(movie, count) {
    return movie.price * count
}

function findMovieByName(name) {
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].title.toLowerCase() === name.toLowerCase()) {
            return movies[i]
        }
    }
    return null
}

const cinema = {
    name: cinemaName,
    movies: movies,

    showInfo() {
        console.log('Кинотеатр "' + this.name + '", фильмов в афише: ' + this.movies.length)
    },

    showMovies() {
        for (let i = 0; i < this.movies.length; i++) {
            showMovie(this.movies[i])
        }
    },

    addMovie(movie) {
        this.movies.push(movie)
    },

    removeLastMovie() {
        this.movies.pop()
    }
}

cinema.showInfo()
cinema.showMovies()

cinema.addMovie({
    title: 'Matrix',
    genre: 'Scifi',
    rating: 9,
    price: 900,
    ageLimit: 16,
    availableSeats: 30
})
cinema.showInfo()

cinema.removeLastMovie()
cinema.showInfo()

movies.forEach(function (movie) {
    console.log(movie.title)
})

const titles = movies.map(function (movie) {
    return movie.title
})
console.log(titles)

const topMovies = movies.filter(function (movie) {
    return movie.rating > 8
})
console.log(topMovies)

const spiderMan = movies.find(function (movie) {
    return movie.title === 'Spider Man'
})
console.log(spiderMan)

function buyTicket(movieName, userAge, tickets, balance) {
    const movie = findMovieByName(movieName)

    if (!movie) {
        console.log('Фильм "' + movieName + '" не найден')
        return balance
    }

    if (!checkAccess(movie, userAge)) {
        console.log('Извините, этот фильм с ' + movie.ageLimit + '+')
        return balance
    }

    if (movie.availableSeats < tickets) {
        console.log('Не хватает мест, осталось только ' + movie.availableSeats)
        return balance
    }

    const total = calculatePrice(movie, tickets)

    if (balance < total) {
        console.log('Не хватает денег. Нужно ' + total + ', у вас ' + balance)
        return balance
    }

    movie.availableSeats -= tickets
    console.log('Готово! Билетов: ' + tickets + ', фильм "' + movie.title + '", оплачено ' + total)
    return balance - total
}

userBalance = buyTicket('Matrix', userAge, 1, userBalance)
userBalance = buyTicket('Starwars', userAge, 1, userBalance)
userBalance = buyTicket('Avangers', userAge, 2, userBalance)
userBalance = buyTicket('Ninja Turtles', userAge, 1, userBalance)
console.log('Остаток на балансе: ' + userBalance)