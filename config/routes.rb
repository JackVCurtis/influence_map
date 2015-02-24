Rails.application.routes.draw do
  devise_for :users
  
  resources :maps
  resources :users
  
  root "maps#index"
end