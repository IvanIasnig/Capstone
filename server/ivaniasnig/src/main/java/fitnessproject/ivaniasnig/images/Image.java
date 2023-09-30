package fitnessproject.ivaniasnig.images;

import java.time.LocalDate;
import java.util.Base64;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import fitnessproject.ivaniasnig.user.User;
import jakarta.persistence.Basic;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Image {

    @Id
    @GeneratedValue
    private UUID id;
    
    private String name;
    
    private String description;
    
    private LocalDate date;

    private byte[] data;
    
    
    @ManyToOne
    @JsonIgnore
    private User user;


	public Image(String name, String description, LocalDate date, byte[] data) {

		this.name = name;
		this.description = description;
		this.date = date;
		this.data = data;
	}


}


