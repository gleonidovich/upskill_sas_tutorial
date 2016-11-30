class Users::RegistrationsController < Devise::RegistrationsController
  # extend the default create method in Devise so that users
  # signing up with Pro account save with a Stripe subscription function
  # otherwise Devise signs up as usual
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end