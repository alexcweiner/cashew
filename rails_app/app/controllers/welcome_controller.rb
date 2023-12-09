# app/controllers/welcome_controller.rb

class WelcomeController < ApplicationController
  def index
    render json: { message: "Welcome to my Rails API!" }
  end
end
