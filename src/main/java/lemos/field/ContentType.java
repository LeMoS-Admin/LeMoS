package lemos.field;

public enum ContentType
{
    TEXT("Text"),
    IMAGE("Image"),
    AUDIO("Audio"),
    VIDEO("Video");

    private final String name;

    ContentType(String name)
    {
        this.name = name;
    }

    public String asName()
    {
        return name;
    }
}
