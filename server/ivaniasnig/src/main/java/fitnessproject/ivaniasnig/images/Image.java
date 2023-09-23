package fitnessproject.ivaniasnig.images;

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

    private byte[] data;
    
    @ManyToOne
    @JsonIgnore
    private User user;

    public Image(String name, byte[] data) {
        this.name = name;
        this.data = data;
    }
}


