package fitnessproject.ivaniasnig.user;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class User implements UserDetails {
	
	@GeneratedValue
	@Id
	private UUID id;
	private String surname;
	private String name;
	private int age;
	@Enumerated(EnumType.STRING)
	private sexEnum sex;
	private String password;
	private String mail;
	private String username;
	@Enumerated(EnumType.STRING)
	private Role role;
	
	public User(String surname, String name, int age, sexEnum sex, String password, String mail, String username, Role role) {
		this.surname = surname;
		this.name = name;
		this.age = age;
		this.sex = sex;
		this.password = password;
		this.mail = mail;
		this.username = username;
		this.role = role;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
}
