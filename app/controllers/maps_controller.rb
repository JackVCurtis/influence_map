class MapsController < ApplicationController
  def index
    @maps = Map.all
  end

  def show
    @map = Map.find(params[:id])
  end

  def new
    @map = Map.new
  end

  def create
    @map = Map.new(map_params)
    @map.user = current_user
    if @map.save
      redirect_to maps_path
    end
  end

  def edit
    @map = Map.find(params[:id])
    if current_user != @map.user
      redirect_to maps_path
    end
  end

  def update
    @map = Map.find(params[:id])
    if current_user == @map.user
      @map.update(map_params)
      redirect_to @map
    end
  end

  private

  def map_params
    return params.require(:map).permit(:name, :query)
  end
end
