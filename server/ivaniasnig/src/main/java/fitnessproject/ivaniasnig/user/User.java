package fitnessproject.ivaniasnig.user;

import java.util.UUID;

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
public class User {
	
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
	
}
