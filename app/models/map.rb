class Map < ActiveRecord::Base
  belongs_to :user

  def search_api
    api_key = "&apikey=" + ENV["sunlight_api_key"]
    search_string = "http://transparencydata.com/api/1.0/contributions.json?" + self.query + api_key
    HTTParty.get(search_string)
  end

end