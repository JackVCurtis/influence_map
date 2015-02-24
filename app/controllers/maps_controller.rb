class MapsController < ApplicationController
  def index
  end

  def new
    @map = Map.new
  end

  def create
    @map = Map.new
  end

  private

  def map_params
    return params.require(:map).permit(:name, :query)
  end
end
