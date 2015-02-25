Rails.application.routes.draw do
  devise_for :users
  
  resources :maps
  resources :users
  
  get "/data", to: "maps#data"
  root "maps#index"
end