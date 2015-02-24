class UsersController < ApplicationController
  def show
    @maps = Map.where(user_id: current_user.id)
  end
end