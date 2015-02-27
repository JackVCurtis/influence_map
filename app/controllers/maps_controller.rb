class MapsController < ApplicationController
  def data
      @map = Map.new
      @map.query = params[:query].to_query

    render json: {results: @map.search_api, query: @map.query}
  end

  def index
    @maps = Map.all
  end

  def show
    @map = Map.find(params[:id])
    @query_hash =  Rack::Utils.parse_nested_query(@map.query)

    respond_to do |format|
      format.html
      format.json {render :json => {results: @map.search_api, query: @query_hash}}
    end
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
    @query_hash =  Rack::Utils.parse_nested_query(@map.query)
    if current_user != @map.user
      redirect_to maps_path
    end
    respond_to do |format|
      format.html
      format.json {render :json => {results: @map.search_api, query: @query_hash}}
    end
  end

  def update
    @map = Map.find(params[:id])
    if current_user == @map.user
      @map.update(map_params)
      redirect_to @map
    end
  end

  def destroy
    @map = Map.find(params[:id])
    if current_user == @map.user
      @map.destroy
      redirect_to current_user
    end
  end

  private

  def map_params
    return params.require(:map).permit(:name, :query)
  end
end
