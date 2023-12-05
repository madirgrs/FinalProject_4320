from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    selected_option = request.form['dropdownMenu']
    
    if selected_option == 'option2':
        # Redirect or handle Admin Login
        return redirect('/admin_login')
    elif selected_option == 'option3':
        # Redirect or handle Reservation
        return redirect('/reserve_a_seat')
    else:
        # Handle default or invalid option
        return redirect('/')


@app.route('/admin_login')
def admin_login():
    # Render the admin login template or handle logic
    return render_template('adminLogin.html')

@app.route('/reserve_a_seat')
def reserve_a_seat():
    # Render the admin login template or handle logic
    return render_template('reservations.html')

if __name__ == '__main__':
    app.run(debug=True)