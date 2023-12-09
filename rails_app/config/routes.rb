Rails.application.routes.draw do
  get 'welcome', to: 'welcome#index'

  # Catch all undefined routes
  root 'application#route_not_found'
  match '*path', via: :all, to: 'application#route_not_found'

end
