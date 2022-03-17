CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

sequelize db:create campus_bops_v2
sequelize model:create --name school --attributes name:string
sequelize model:create --name category --attributes name:string
sequelize model:create --name song --attributes title:string,artist:string,album:string,songPlayerId:string
sequelize model:create --name user --attributes name:string,email:string,password:string