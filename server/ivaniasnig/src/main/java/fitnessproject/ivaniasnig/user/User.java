package fitnessproject.ivaniasnig.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import fitnessproject.ivaniasnig.customtable.CustomTable;
import fitnessproject.ivaniasnig.diet.Diet;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
	private Role role = Role.USER;
	private double height;
	private double weight;
	@Enumerated(EnumType.STRING)
	private Activity activity;
	
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diet_id")
    private Diet diet;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL)
	private List<CustomTable> customTables = new ArrayList<>();

	
    public User(String surname, String name, int age, sexEnum sex, String password, String mail, String username,
            double height, double weight, Activity activity) {
            this.surname = surname;
            this.name = name;
            this.age = age;
            this.sex = sex;
            this.password = password;
            this.mail = mail;
            this.username = username;
            this.height = height;
            this.weight = weight;
            this.activity = activity;
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
