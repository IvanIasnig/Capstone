package fitnessproject.ivaniasnig.security;

import fitnessproject.ivaniasnig.user.Activity;
import fitnessproject.ivaniasnig.user.Role;
import fitnessproject.ivaniasnig.user.User;
import fitnessproject.ivaniasnig.user.sexEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenResponse {
    private String token;
	private String surname;
	private String name;
	private int age;
	private sexEnum sex;
	private String mail;
	private String username;
	private Role role;
	private double height;
	private double weight;
	private Activity activity;
	
	public TokenResponse(String token, User user) {
		this.token = token;
		this.surname = user.getSurname();
		this.name = user.getName();
		this.age = user.getAge();
		this.sex = user.getSex();

		this.mail = user.getMail();
		this.username = user.getUsername();
		this.role = user.getRole();
		this.height = user.getHeight();
		this.weight = user.getWeight();
		this.activity = user.getActivity();
	}



}
