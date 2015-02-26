class UsersController < ApplicationController
  def show
    @maps = Map.where(user_id: params[:id])
  end
end