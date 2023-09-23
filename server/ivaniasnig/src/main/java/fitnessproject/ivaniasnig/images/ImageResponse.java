package fitnessproject.ivaniasnig.images;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageResponse {
    private UUID id;
    private String name;
    private String base64Image;
    
	public ImageResponse(UUID id, String name, String base64Image) {
		this.id = id;
		this.name = name;
		this.base64Image = base64Image;
	}
   
}

