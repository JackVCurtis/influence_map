Rails.application.routes.draw do
  devise_for :users
  
  resources :maps

  root "maps#index"
end